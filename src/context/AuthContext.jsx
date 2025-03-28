import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updatePassword 
} from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, collection,  query, where, updateDoc  } from "firebase/firestore";
import { auth, db } from "../services/firebase";
// schema
import { registerSchema } from "../validationSchemas/Schemas"
import CryptoJS from "crypto-js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(null);
    const [messege, setMessege] = useState(true);
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
            getuser(user.uid);
            localStorage.setItem("userId", user.uid);
            console.log("Login realizado com sucesso!");
            setAuthenticated(true);
            // navigate("/dashboard/jogo"); // Redireciona após login
            // return { success: true, message: "Login realizado com sucesso!" };
        } catch (error) {
            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "Email ou Senha Incorreto", 
                    message: "Email ou Senha que vocé inseriu está incorreto. Por favor, tente novamente." 
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
        } catch (error) {
            console.log("Erro ao deslogar:", error);
        }
    };

    const registerUser = async (data) => {
        setLoading(true);

        try {
            const validatedUser =  registerSchema.parse(data); // Valida o objeto
            if(!validatedUser) return validatedUser.errors;

            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            
            console.log("Usuário criado com sucesso:");
            
            await setDoc(doc(db, "users", user.uid), {
                name: data.name,
                phone: data.phone,
                email: data.email,
                lastPaymentDate: data.lastPaymentDate,
                acceptTerms: data.acceptTerms,
                isAdmin: data.isAdmin,
                createdAt: data.createdAt,
                status: data.status,
                password:data.password
            });

            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "Cadastro Realizado com sucesso ✅", 
                    message: `
                        ✅ Bem-vindo ao Trin-Flow! 🎉
                        Estamos felizes por ter você com a gente!
                        Agora você faz parte de uma plataforma que vai transformar sua experiência.
                        Explore, aproveite e conte conosco nessa jornada.
                        💚 Vamos começar? 😉
                    `
                });
            }, 2000);

            // logoutUser()
            return { success: true };
        } catch (error) {

            if (error.code === "auth/email-already-in-use") {
                setTimeout(() => {
                    setMessege({ 
                        success: false,
                        title: "Erro ao Cadastrar", 
                        message: "O e-mail já está em uso! Tente fazer login ou recuperar sua senha."
                    });
                }, 2000);
            }else {
                setTimeout(() => {
                    setMessege({ 
                        success: false,
                        title: "Erro ao Cadastrar", 
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

    const checkEmailExists = async (email) => {
        try {
            // Verifica se o e-mail existe na coleção "users"
            const querySnapshot = await getDocs(collection(db, "users"));
            // Verifica se algum dos documentos contém o e-mail desejado
            const exists = querySnapshot.docs.some(doc => doc.data().email === email);
            return exists; // Retorna true se o e-mail existir, false caso contrário
        } catch (error) {
            setTimeout(() => {
                setMessege({success: false, title: "Erro email não encontrado", message: "Por favor, verifique o email e tente novamente"});
            }, 2000);
            return;
        }
    };
    
    // envio de email
    const sendEmail = async (email, recoveryCode) => {
        setLoading(true);
        
        try {
            const exists = await checkEmailExists(email);
            if (!exists) return { success: false, title: "Email não encontrado", message: "Por favor, verifique o email e tente novamente" };
            
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f9;
                                color: #333;
                                padding: 20px;
                            }
                            h1 {
                                color: #1E90FF;
                            }
                            h2 {
                                color:#FF9D00;
                                padding-left:25px;
                            }
                            .content {
                                background-color:rgb(255, 255, 255);
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
                            }
                            .img {
                                display: block;
                                width: 150px;
                                heigth: 150px;
                            }
                            .code {
                                color:#FF9D00;
                                font-size: 40px;
                                font-weight: 900;
                            }
                            b {
                                color:#FF9D00;
                                font-size: 20px;
                                font-weight: 900;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="content">
                            <img class="img" src="https://trin-flow.netlify.app/assets/logo-a64r1GgQ.png" alt="Logo do Site" />
                            <h2>Trin-Flow</h2>
                            <h1>Código de Recuperação</h1>
                            <p>Olá... Seu código de recuperação é: ⬇️</p>
                            <p class="code">${recoveryCode}</p>
                            <p>Por favor, use este código para recuperar sua conta.</p>
                            <p>Atenciosamente ➡️ Equipe <b>Trin-Flow</b> </p>
                        </div>
                    </body>
                </html>
            `;
        
            // Configuração do e-mail
            const mailOptions = {
                from: import.meta.env.VITE_EMAIL_USER, // Acessando variáveis do Vite
                to: email,
                subject: "Código de Recuperação",
                html: htmlContent,
            };
        
            // Enviar o e-mail com o Nodemailer
            const response = await fetch("https://trin-flow.netlify.app/.netlify/functions/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mailOptions), // Passa os dados do e-mail
            });
        
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro ao enviar o e-mail: ${response.statusText}`);
            }
            
            return { success: true };
        } catch (error) {
            setMessege({success: false, title: "Erro ao enviar o e-mail", message: " por favor, tente novamente"});
            console.error("Erro ao tentar enviar o e-mail:", error.message);
        } finally {
            setLoading(false);
        }
    };


    // Função para buscar o usuário e alterar a senha
const updateUserPassword = async (email, newPassword) => {
    setLoading(true);

    try {
        // 1️⃣ Buscar o usuário pelo e-mail no Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return 
        }
        
        const userDoc = querySnapshot.docs[0]; // Pegamos o primeiro usuário encontrado
        const userData = userDoc.data();
        
        if (!userData.password) {
            return
        }
        const oldPassword = userData.password;
        // 2️⃣ Autenticar o usuário com a senha antiga
        const userCredential = await signInWithEmailAndPassword(auth, email, oldPassword);
        const user = userCredential.user;
        // 3️⃣ Atualizar a senha no Firebase Authentication
        await updatePassword(user, newPassword);
        // 4️⃣ Atualizar a senha no Firestore
        const userDocRef = doc(db, "users", userDoc.id);
        await updateDoc(userDocRef, { password: newPassword });

        setTimeout(() => {
            setMessege({ 
                success: false,
                title: "Senha Redefinida com sucesso ! ✅", 
                message: `
                    🔒 Sua senha foi atualizada com sucesso!
                    Agora você pode acessar sua conta com segurança e tranquilidade.
                    Atenciosamente Equipe  ➡️ Trin-Flow!
                `
            });
        }, 2000);

        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar a senha:", error);
        setMessege({success: false, title: "Erro ao atualizar a senha", message: " por favor, tente novamente"});
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
            // setIsAdmin(user.isAdmin);
        } else {
            console.log("Usuário não encontrado.");
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
                sendEmail,
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
