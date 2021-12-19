const N_input = document.querySelector("#NInput")
const P_input = document.querySelector("#PInput")
const repition_input = document.querySelector("#repition")
const order_input = document.querySelector("#order")
const finalResultInput = document.querySelector("#NP")

document.querySelector(".calculateBu").addEventListener("click", () => { calculerLesPossibilites() })

const afficherResultat = (end) => {
    let start = 0;
    let duration = 800;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        finalResultInput.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);

}

const thingsGoingWrong = () => {
    finalResultInput.textContent = "P ne peut pas etre plus grand que N";
    N_input.value = null;
    N_input.focus()

}

const factorial = (n) => (n == 0 ? 1 : n * factorial(n - 1));

// C(n,p) = n! / (p!*(n-p)!)
const combinaisonSansRemise = (n, p) => (factorial(n) / (factorial(p) * factorial(n - p)))

// C(n,p) = (n+p-1)! / (p!*(n-1)!)
const combinaisonAvecRemise = (n, p) => (factorial(n + p - 1) / (factorial(p) * factorial(n - 1)))

// A(n,p) = n! / (n-p)!
const arrangement = (n, p) => (factorial(n) / (factorial(n - p)))

const calculerLesPossibilites = () => {

    const N = Number(N_input.value);
    const P = Number(P_input.value);
    const repition = repition_input.checked;
    const order = order_input.checked;
    let resultat;
    if (P > N) return thingsGoingWrong();
    //different cases
    if (order && repition) {
        resultat = N ** P;
    } else if (!order && repition) {
        resultat = combinaisonAvecRemise(N, P)
    } else if (order && !repition) {
        resultat = (N == P) ? factorial(N) : arrangement(N, P)
    } else if (!order && !repition) {
        resultat = combinaisonSansRemise(N, P)
    }
    afficherResultat(resultat)
}
