import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import figure from '../../Components/assets/figure-home.svg';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate(); // Hook para redirecionar

  useEffect(() => {
    let timer;
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        let newProgress = prevProgress + 1;

        // Pausa nos 27% e 80%
        if (newProgress === 27 || newProgress === 80) {
          clearInterval(progressInterval);
          setTimeout(() => {
            timer = setInterval(() => {
              setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                  clearInterval(timer);
                  return 100;
                }
                return prevProgress + 1;
              });
            }, 150); // Retorna a atualização a cada 150ms
          }, 3000); // Pausa de 2 segundos
        }

        return newProgress;
      });
    }, 150); // A cada 150ms a barra aumenta 1%

    return () => clearInterval(progressInterval); // Limpar o intervalo quando o componente for desmontado
  }, []);

  useEffect(() => {
    // Redireciona para outra página quando o progresso atinge 100%
    if (progress === 100) {
      setTimeout(() => {
        navigate('/relatorios'); // 
      }, 500); // Pequeno delay para o usuário perceber o 100%
    }
  }, [progress, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.illustration}>
          {/* Coloque aqui a imagem ou a ilustração desejada */}
          <img
            src={figure}
            alt="Illustration"
            style={styles.image}
          />
        </div>
        <div style={styles.progressBarContainer}>
          <div style={styles.progressBarBackground}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            ></div>
          </div>
          <p style={styles.progressText}>{progress}%</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
  },
  content: {
    textAlign: 'center',
  },
  illustration: {
    marginBottom: '20px',
  },
  image: {
    width: '350px',
    height: '350px',
  },
  progressBarContainer: {
    marginTop: '20px',
  },
  progressBarBackground: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    marginBottom: '10px',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffb74d',
    borderRadius: '5px',
    transition: 'width 0.15s ease-in-out',
  },
  progressText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default LoadingPage;
