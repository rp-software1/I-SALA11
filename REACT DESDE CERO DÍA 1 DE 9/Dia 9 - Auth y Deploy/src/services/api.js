const BASE_URL = "https://jsonplaceholder.typicode.com"; // placeholder, reemplaza con tu API real

export async function getPlatos() {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) throw new Error("Error al obtener los platos");
    // Esto es un placeholder - en producción mapearías los datos reales
    throw new Error("API no configurada, usando datos mock");
}
