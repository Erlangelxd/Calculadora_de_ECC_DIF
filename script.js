function resolverEcuacion() {
    // Obtener los coeficientes del HTML y convertirlos a números
    const a = parseFloat(document.getElementById('coeficienteA').value);
    const b = parseFloat(document.getElementById('coeficienteB').value);
    const c = parseFloat(document.getElementById('coeficienteC').value);

    // Validar los coeficientes
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById('resultado').textContent = "Los coeficientes deben ser números.";
        return;
    }

    // Manejar casos especiales
    if (a === 0 && b === 0) {
        document.getElementById('resultado').textContent = "La ecuación no es de segundo orden.";
        return;
    } else if (a === 0) {
        // Ecuación lineal
        if (b === 0) {
            document.getElementById('resultado').textContent = "La ecuación es trivial: y = C";
        } else {
            document.getElementById('resultado').textContent = `y = (-${c}/${b})*x + C`;
        }
        return;
    }

    // Calcular el discriminante de forma más robusta para evitar errores de redondeo
    const discriminante = b * b - 4 * a * c;
    // Si el discriminante es muy cercano a cero, considerarlo como cero para evitar raíces imaginarias muy pequeñas
    const epsilon = 1e-10; // Ajustar el valor de epsilon según sea necesario
    if (Math.abs(discriminante) < epsilon) {
        discriminante = 0;
    }

    // Resolver la ecuación característica y obtener las raíces
    let raiz1, raiz2;
    if (discriminante >= 0) {
        raiz1 = (-b + Math.sqrt(discriminante)) / (2*a);
        raiz2 = (-b - Math.sqrt(discriminante)) / (2*a);
    } else {
        // Si el discriminante es negativo y no se ha definido i, mostrar un mensaje de error
        if (typeof i === 'undefined') {
            document.getElementById('resultado').textContent = "Verifica los valores ingresados y vuelve a intentarlo";
            return;
        }
        const parteReal = -b / (2*a);
        const parteImaginaria = Math.sqrt(-discriminante) / (2*a);
        raiz1 = parteReal + parteImaginaria * i;
        raiz2 = parteReal - parteImaginaria * i;
    }

    // Construir la solución general
    let solucion;
    if (discriminante >= 0) {
        solucion = `y = C1*e^(${raiz1}*x) + C2*e^(${raiz2}*x)`;
    } else {
        solucion = `y = e^(${parteReal}*x) * (C1*cos(${parteImaginaria}*x) + C2*sin(${parteImaginaria}*x))`;
    }

    // Mostrar la solución en el HTML
    document.getElementById('resultado').textContent = solucion;
}