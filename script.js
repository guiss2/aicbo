// === CONFIGURA TU FIREBASE ABAJO ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNR-PF-laA61sqbnk6bCjwDBgfdrscoPc",
  authDomain: "aicbo-cb24c.firebaseapp.com",
  projectId: "aicbo-cb24c",
  storageBucket: "aicbo-cb24c.appspot.com", // corregido: falta ".appspot.com"
  messagingSenderId: "563279763145",
  appId: "1:563279763145:web:96020162c22dcc392bdf18",
  measurementId: "G-9D208LWPYX"
};

// Inicializa Firebase y servicios
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Referencia al formulario
const form = document.getElementById('form-asistencia');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const celular = document.getElementById('celular').value.trim();
  const email = document.getElementById('email').value.trim();
  const actividad = document.getElementById('actividad').value;

  try {
    await addDoc(collection(db, "asistentes"), {
      nombre,
      celular,
      email,
      actividad,
      timestamp: new Date()
    });

    mensaje.textContent = "✅ Registro exitoso. ¡Gracias por confirmar tu asistencia!";
    mensaje.style.color = "green";
    form.reset();
  } catch (error) {
    console.error("Error al guardar en Firestore", error);
    mensaje.textContent = "❌ Ocurrió un error. Intenta nuevamente.";
    mensaje.style.color = "red";
  }
});
