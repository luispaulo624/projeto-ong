document.addEventListener('DOMContentLoaded', () => {
    // Dados Fictícios
    const dadosRecursos = {
        labels: ["Educação", "Saúde", "Administrativo", "Alimentação"],
        valores: [40, 25, 15, 20],
        cores: ['#007bff', '#28a745', '#ffc107', '#dc3545']
    };

    const dadosVoluntarios = {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        valores: [10, 12, 18, 25, 22, 30]
    };
    
    const dadosImpacto = {
        labels: ["Norte", "Sul", "Leste", "Oeste"],
        valores: [150, 220, 180, 300]
    };

    // Gráfico de Pizza
    const ctxPizza = document.getElementById('graficoRecursos')?.getContext('2d');
    if (ctxPizza) {
        let total = dadosRecursos.valores.reduce((a, b) => a + b, 0);
        let anguloInicial = 0;
        dadosRecursos.valores.forEach((valor, i) => {
            let fatia = (valor / total) * 2 * Math.PI;
            ctxPizza.fillStyle = dadosRecursos.cores[i];
            ctxPizza.beginPath();
            ctxPizza.moveTo(200, 200);
            ctxPizza.arc(200, 200, 150, anguloInicial, anguloInicial + fatia);
            ctxPizza.closePath();
            ctxPizza.fill();
            // Adicionar legenda simples
            ctxPizza.fillRect(10, 20 + i*30, 20, 20);
            ctxPizza.fillStyle = '#000';
            ctxPizza.fillText(dadosRecursos.labels[i], 40, 35 + i*30);
            anguloInicial += fatia;
        });
    }

    // Gráfico de Linha
    const ctxLinha = document.getElementById('graficoVoluntarios')?.getContext('2d');
    if (ctxLinha) {
        const largura = ctxLinha.canvas.width;
        const altura = ctxLinha.canvas.height;
        const maxValor = Math.max(...dadosVoluntarios.valores);
        
        ctxLinha.beginPath();
        ctxLinha.strokeStyle = '#007bff';
        ctxLinha.lineWidth = 2;

        dadosVoluntarios.valores.forEach((valor, i) => {
            const x = (i / (dadosVoluntarios.labels.length - 1)) * (largura - 40) + 20;
            const y = altura - (valor / maxValor) * (altura - 40) - 20;
            if (i === 0) {
                ctxLinha.moveTo(x, y);
            } else {
                ctxLinha.lineTo(x, y);
            }
            // Label no eixo X
            ctxLinha.fillStyle = '#000';
            ctxLinha.fillText(dadosVoluntarios.labels[i], x - 10, altura - 5);
        });
        ctxLinha.stroke();
    }
    
    // Gráfico de Barras
    const ctxBarra = document.getElementById('graficoImpacto')?.getContext('2d');
    if(ctxBarra) {
        const largura = ctxBarra.canvas.width;
        const altura = ctxBarra.canvas.height;
        const maxValor = Math.max(...dadosImpacto.valores);
        const espaco = 20;
        const larguraBarra = (largura - espaco * (dadosImpacto.labels.length + 1)) / dadosImpacto.labels.length;

        dadosImpacto.valores.forEach((valor, i) => {
            const alturaBarra = (valor / maxValor) * (altura - 40);
            const x = espaco + i * (larguraBarra + espaco);
            const y = altura - alturaBarra - 20;
            ctxBarra.fillStyle = '#28a745';
            ctxBarra.fillRect(x, y, larguraBarra, alturaBarra);
            // Label
            ctxBarra.fillStyle = '#000';
            ctxBarra.fillText(dadosImpacto.labels[i], x + larguraBarra/4, altura - 5);
        });
    }
});