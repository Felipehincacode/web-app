import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import equipoFullface from "./assets/equipo-fullface.webp";

function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return "Por favor, ingresa un correo electrónico válido.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    
    // LOG FOR DEBUGGING
    console.log("Intentando vibrar. Soporte detectado:", !!navigator.vibrate);

    // Initial pulse to confirm trigger
    if (navigator.vibrate) {
      // simpler stronger pulse for Android
      navigator.vibrate(1000); 
      // wait a bit and start pattern
      setTimeout(() => {
        navigator.vibrate([500, 200, 500, 200, 500, 200, 500, 200, 500]);
      }, 1100);
    }

    setStatus("loading");

    // Simulate backend process and trigger success
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        window.location.href = "https://drive.google.com/uc?export=download&id=1p3AeEasGSCJIVm0tzpH6Fj9j69pigXpo";
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {status === "success" && (
          <motion.div 
            key="success"
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Blurred Background Image */}
            <div 
              className="success-bg-image" 
              style={{ backgroundImage: `url(${equipoFullface})` }}
            />
            
            {/* Descending Success Content */}
            <motion.div 
              className="success-card"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] // Fluid, high-end ease
              }}
              onAnimationComplete={() => {
                if (navigator.vibrate) navigator.vibrate(50); // Haptic feedback
              }}
            >
              <div className="marca-success">
                FullFace
              </div>

              <h1 className="success-title">
                Tu descarga comenzará <br /> en breves momentos.
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ORIGINAL LAYOUT STRUCTURE */}
      <main className="contenedor">
        <p className="marca">FullFace</p>
        
        <img 
          src={equipoFullface} 
          alt="Equipo de especialistas FullFace" 
          className="imagen-equipo"
          width="400"
          height="517"
          fetchpriority="high"
          decoding="async"
        />
        
        <span className="badge-regalo">Un regalo para ti</span>
        
        <h1 className="titulo">
            Los <span>Secretos</span> que Nadie te Cuenta sobre el Cuidado Facial
        </h1>
        
        <p className="subtitulo">Guía gratuita creada por especialistas</p>
        
        <p className="descripcion">
            Preparamos esta guía con los <strong>tips más efectivos</strong> que usamos 
            con nuestros pacientes, además de desmentir los mitos que probablemente 
            te han hecho gastar dinero en cosas que no funcionan.
        </p>
        
        <div className="beneficios">
            <p className="beneficios-titulo">Dentro de la guía encontrarás:</p>
            <p>Cómo prevenir arrugas con 4 hábitos simples</p>
            <p>Tips efectivos para controlar el acné</p>
            <p>Qué ingredientes usar para eliminar manchas</p>
            <p>Tu rutina AM y PM paso a paso</p>
        </div>
        
        <form 
          className="formulario" 
          onSubmit={handleSubmit}
        >
            <input 
                type="email" 
                name="email" 
                className="campo-email" 
                placeholder="Tu correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {error && <p style={{ color: '#b08968', fontSize: '13px', marginBottom: '10px' }}>{error}</p>}
            
            <button 
              type="submit" 
              className="boton"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Procesando..." : "Quiero Mi Guía Gratis"}
            </button>
        </form>
        
        <p className="privacidad">
            Tu correo está seguro. Solo lo usamos para enviarte contenido de valor.
        </p>
        
        <div className="cita">
            "La mejor inversión en tu piel es el conocimiento. 
            Todo lo demás viene después."
            <p className="cita-autor">— Equipo FullFace</p>
        </div>
        
        <footer className="footer">
            <p>© 2025 FullFace · Medicina Estética · Medellín, Colombia</p>
            <p style={{ marginTop: '8px' }}>@fullface.co</p>
        </footer>
      </main>
    </>
  );
}

export default App;
