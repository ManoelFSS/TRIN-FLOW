import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);

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
                    user,
                    getuser,
                    setLoading,
                    loading,
                    messege, setMessege
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
