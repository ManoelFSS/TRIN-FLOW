import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
// schema
import { registerSchema } from "../validationSchemas/Schemas"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);
    const [selectForm, setSelectForm] = useState("login");

    // const navigate = useNavigate();

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
            // navigate("/login");
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
                status: data.status
            });
            
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

    // envio de email
    const sendEmail = async (email, recoveryCode) => {
        setLoading(true);
        console.log(email, recoveryCode);

        try {
            const userName = "paulo"; // Nome do usuário
            
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
                            .content {
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                            }
                            .button {
                                background-color: #4CAF50;
                                color: white;
                                padding: 10px 20px;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="content">
                            <h1>Código de Recuperação</h1>
                            <p>Olá ${userName},</p>
                            <p>Seu código de recuperação é: <strong>${recoveryCode}</strong></p>
                            <p>Por favor, use este código para recuperar sua conta.</p>
                            <a href="https://trin-flow.netlify.app/" class="button">Acessar Recuperação</a>
                            <img src="https://trin-flow.netlify.app/assets/logo-DkWKLF2t.svg" alt="Logo do Site" />
                            <p>Atenciosamente,<br>Equipe Trin-Flow</p>
                        </div>
                    </body>
                </html>
            `;
        
            // Configuração do e-mail
            const mailOptions = {
                from: process.env.VITE_EMAIL_USER,
                to: email,
                subject: "Código de Recuperação",
                html: htmlContent, // Passa o conteúdo HTML aqui
            };
        
            // Enviar o e-mail com o Nodemailer
            const response = await fetch("/.netlify/functions/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mailOptions), // Passa os dados do e-mail
            });
        
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro ao enviar o e-mail: ${response.statusText}`);
            }
        
            console.log("E-mail enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao tentar enviar o e-mail:", error.message);
            alert("Ocorreu um erro ao enviar o e-mail. Tente novamente.");
        }finally {
            setLoading(false);
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
                sendEmail
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
