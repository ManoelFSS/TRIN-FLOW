import { createContext, useContext, useState, useEffect } from "react";
import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, collection,  query, where, updateDoc  } from "firebase/firestore";
import { auth, db } from "../services/firebase";
// schema
import { registerSchema, recoverySchema  } from "../validationSchemas/Schemas"
// services
import { encryptPassword, decryptPassword } from "../services/encryptionService";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(null);// loading do form
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [selectForm, setSelectForm] = useState("login");

    // Verifica a autenticação ao carregar a página
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    await currentUser.getIdToken(true); // Garante que o token está atualizado
                    setAuthenticated(true);
                    getuser(currentUser.uid);
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("userId", currentUser.uid);
                } catch (error) {
                    console.error("Erro ao obter token:", error);
                    setUser(null);
                    setAuthenticated(false);
                    setUserId(null);
                }
            } else {
                setUser(null);
                setAuthenticated(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Função de login
    const signInUser = async (email, password) => {
        setLoading(true);
        try {
            await setPersistence(auth, browserLocalPersistence); // Garante a persistência
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            getuser(user.uid);// pegar os dados do usuário
            localStorage.setItem("userId", user.uid);
            console.log("Login realizado com sucesso!");
            setAuthenticated(true);
        } catch (error) {
            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "Email ou Senha Incorreto", 
                    message: "Email ou Senha que vocé inseriu está incorreto. Por favor, Verifique seus dados e tente novamente." 
                });
            }, 2000);
            return  {success: false};
        }finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    // Função de logout
    const logoutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setAuthenticated(false);
            localStorage.clear();
            setSelectForm("login")
            navigate("/");
        } catch (error) {
            console.log("Erro ao deslogar:", error);
        }
    };

    // Função de cadastro
    const registerUser = async (data) => {
        setLoading(true);

        try {
            const validatedUser =  registerSchema.parse(data); // Valida o objeto
            if(!validatedUser) return validatedUser.errors;// retorn o erro do zod

            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            
            console.log("Usuário criado com sucesso:");
            
            const getEncryptedPassword = await encryptPassword( data.password ); // Senha criptografada
            
            await setDoc(doc(db, "users", user.uid), {
                name: data.name,
                phone: data.phone,
                email: data.email,
                lastPaymentDate: data.lastPaymentDate,
                acceptTerms: data.acceptTerms,
                isAdmin: data.isAdmin,
                createdAt: data.createdAt,
                status: data.status,
                password: getEncryptedPassword
            });

            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "Cadastro Realizado com sucesso ✅", 
                    message: `
                        ✅ Bem-vindo ao Trin-Flow! 🎉\n
                        Estamos felizes por ter você com a gente!
                        Agora você faz parte de uma plataforma que vai transformar sua experiência.\n
                        Explore, aproveite e conte conosco nessa jornada.\n
                        💚 Vamos começar? 😉
                    `
                });
            }, 2000);
            return { success: true };
        } catch (error) {

            if (error.code === "auth/email-already-in-use") {
                console.error("Erro  usuário em uso:", error);
                setTimeout(() => {
                    setMessege({ 
                        success: false,
                        title: "❌ Erro ao Cadastrar", 
                        message: "O e-mail já está em uso!\n\n Tente fazer login ou recuperar sua senha."
                    });
                }, 2000);
            }else {
                setTimeout(() => {
                    console.error("Erro de validação:", error);
                    setMessege({ 
                        success: false,
                        title: "❌ Erro ao Cadastrar", 
                        message: error.errors[0]?.message || "Erro de validação" // Pegando a primeira mensagem de erro
                    });
                }, 2000);
            }
            return  {success: false};
        }finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }

    // Função para buscar o usuário e alterar a senha
    const updateUserPassword = async (data) => {
        setLoading(true);

        try {

            const validatedUserRecovery =  recoverySchema.parse(data); // Valida o objeto
            if(!validatedUserRecovery) return validatedUserRecovery.errors;

            // 1️⃣ Buscar o usuário pelo e-mail no Firestore
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", data.email));
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                return console.log("❌ Usuário não encontrado.");
            }
            
            const userDoc = querySnapshot.docs[0]; // Pegamos o primeiro usuário encontrado
            const userData = userDoc.data();
            
            if (!userData.password) {
                return console.log("❌ Senha não encontrada.");
            }

            // 2️⃣ Autenticar o usuário com a senha antiga
            const getDecryptedPassword = decryptPassword( userData.password ); // Senha descriptografada
            const userCredential = await signInWithEmailAndPassword(auth, data.email, getDecryptedPassword);
            const user = userCredential.user;
            
            // 3️⃣ Atualizar a senha no Firebase Authentication
            await updatePassword(user, data.password);

            // 4️⃣ Atualizar a senha no Firestore
            const getEncryptedPassword = await encryptPassword( data.password );
            const userDocRef = doc(db, "users", userDoc.id);
            await updateDoc(userDocRef, { password: getEncryptedPassword });

            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "Senha Redefinida com sucesso ! ✅", 
                    message: `
                        🔒 Sua senha foi atualizada com sucesso!\n
                        Agora você pode acessar sua conta com segurança e tranquilidade.\n
                        Atenciosamente Equipe  ➡️ Trin-Flow!
                    `
                });
            }, 2000);

            return { success: true };
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "❌ Erro ao atualizar a senha", 
                    message: error.errors[0]?.message || "Erro de validação" // Pegando a primeira mensagem de erro
                });
            }, 2000);
            return { success: false};
        }finally {
            // logoutUser()
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };
    
    // Função para obter os dados do usuário
    const getuser = async (userId) => {
        if (!userId) return { success: false, message: "userId não encontrado." };
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const user = userDoc.data();
            localStorage.setItem("email", JSON.stringify(user.email));
            setAuthenticated(true);
            setUserId(userId);
            setUser(userDoc.data());
        } else {
            console.log("❌ Usuário não encontrado.");
            return { success: false, message: "Usuário não encontrado." };
        }
    }   
    
    return (
        <AuthContext.Provider value=
            {{ 
                authenticated, setAuthenticated, 
                signInUser, logoutUser,
                userId, setUserId,
                user, getuser,
                loading, setLoading,
                messege, setMessege,
                selectForm, setSelectForm,
                registerUser,
                updateUserPassword
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
    }
    return context;
};
