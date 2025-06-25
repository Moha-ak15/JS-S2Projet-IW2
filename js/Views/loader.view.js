export function afficherLoader() {
  const loader = document.getElementById("loader");
  const main = document.querySelector("main");

  if (loader) loader.style.display = "block";
  if (main) main.style.display = "none";
}

export function cacherLoader() {
  const loader = document.getElementById("loader");
  const main = document.querySelector("main");

  if (loader) loader.style.display = "none";
  if (main) main.style.display = "block";
}
