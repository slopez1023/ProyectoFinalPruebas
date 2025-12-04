export const metadata = {
    title: 'Inventario de Productos',
    description: 'Sistema de gestion de inventario',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
                {children}
            </body>
        </html>
    )
}