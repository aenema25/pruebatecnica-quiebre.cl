// grab current date, parsed to human readable and match the pattern of the api format
const getDate = () => {
    const today = new Date();
    const date = today.toJSON().slice(0, 10);
    const parsedDate = `${date.slice(8, 10)}-${date.slice(5, 7)}-${date.slice(0, 4)}`;
    return parsedDate
}
// save currrent dat on variable
const today = getDate()
// prepare api fetch
const getUF = () => fetch(`https://mindicador.cl/api/uf/${today}`, { method: "GET" }).then(response => response.json())

// get uf value and add it to page dynamically
getUF().then(response => {
    document.getElementById("valorUF").innerText = `$${response.serie[0].valor}`
    document.getElementById("fechaValorUF").innerText = today
})

// slider controll
// dot button slider control
document.getElementById("dots").querySelectorAll("i").forEach(one => {
    one.addEventListener("click", () => {
        const id = one.querySelector("span").innerText
        document.getElementById(id).scrollIntoView()
    })
})
// navigate to the previous sibiling
document.getElementById("left-arrow").addEventListener("click", () => {
    const current = document.querySelector(".active")
    if (current.previousElementSibling) {
        current.classList.remove("active")
        current.previousElementSibling.classList.add("active")
        current.previousElementSibling.scrollIntoView()
    }
})
// navigate to the next sibiling
document.getElementById("right-arrow").addEventListener("click", () => {
    const current = document.querySelector(".active")
    if (current.nextElementSibling) {
        current.classList.remove("active")
        current.nextElementSibling.classList.add("active")
        current.nextElementSibling.scrollIntoView()
    }
})
// modal
// Get the modal data
const modal = document.getElementById("modal");
const button = document.getElementById("send");
const closeButton = document.getElementById("close")

button.addEventListener("click", () => {
    //grab form values
    const name = document.getElementById("nombre")
    const lastname = document.getElementById("apellido")
    const phone = document.getElementById("telefono")
    const email = document.getElementById("correo")
    //check if form value are valid
    if (name.validity.valid && lastname.validity.valid && phone.validity.valid && email.validity.valid) {
        //prepare body message ad added tu modal
        const bodyhtml = `
                Estimado <strong>${name.value} ${lastname.value}</strong>, uno de nuestros ejecutivos se contactara contigo al <strong>${phone.value}</strong> y enviara información adicional a tu correo <strong>${email.value}</strong>
                `
        document.getElementById("modal-body").innerHTML = bodyhtml
        modal.style.display = "block";
    }
})

// close the modal if use click the "x" button
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
})

// close the modal if use click outside the modal
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
})

// navbar open movile version

document.getElementById("openMenu").addEventListener("click", () => {
    if (document.getElementById("navMenu").style.display === "none") {
        document.getElementById("navMenu").style.display = "flex"
    } else {
        document.getElementById("navMenu").style.display = "none"
    }
})
// animate car entrance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const intersecting = entry.isIntersecting
        if(intersecting){
            entry.target.classList.add("car-animation")
        }
    })
}, { rootMargin: "0px 0px 0px -50%" });
const images = document.querySelectorAll(".slider-image")

images.forEach(image => {
    observer.observe(image)
})