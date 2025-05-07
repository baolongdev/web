import Button from '@components/UI/Button';

const colorPalette = [
    { name: 'Primary (bg-secondary)', className: 'bg-secondary text-white' },
    { name: 'Accent (bg-accent)', className: 'bg-accent text-white' },
    { name: 'Info (text-info)', className: 'text-info bg-white border border-gray-200' },
    { name: 'Gray 100', className: 'bg-gray-100 text-gray-800' },
    { name: 'Gray 300', className: 'bg-gray-300 text-gray-900' },
    { name: 'Gray 400', className: 'bg-gray-400 text-gray-900' },
    { name: 'Red 600', className: 'bg-red-600 text-white' },
    { name: 'Red 700', className: 'bg-red-700 text-white' },
    { name: 'White', className: 'bg-white text-gray-800 border border-gray-200' },
];

const typographySamples = [
    { tag: 'h1', text: 'Heading 1', className: 'text-4xl font-bold' },
    { tag: 'h2', text: 'Heading 2', className: 'text-3xl font-semibold' },
    { tag: 'h3', text: 'Heading 3', className: 'text-2xl font-medium' },
    { tag: 'p', text: 'Body Text', className: 'text-base' },
    { tag: 'small', text: 'Caption Text', className: 'text-sm text-gray-500' },
];

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10 space-y-16">
            <h1 className="text-5xl font-extrabold text-center text-gray-800">🎨 Design System</h1>

            {/* Colors */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Color Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {colorPalette.map((color, idx) => (
                        <div
                            key={idx}
                            className={`h-24 rounded-lg shadow-md flex items-center justify-center text-sm font-medium ${color.className}`}
                        >
                            {color.name}
                        </div>
                    ))}
                </div>
            </section>

            {/* Typography */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Typography</h2>
                <div className="space-y-4">
                    {typographySamples.map((item, idx) => (
                        <div key={idx} className={item.className}>{item.text}</div>
                    ))}
                </div>
            </section>

            {/* Buttons */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button label="Primary" variant="primary" />
                    <Button label="Secondary" variant="secondary" />
                    <Button label="Danger" variant="danger" />
                    <Button label="Outline" variant="outline" />
                    <Button label="Pink" variant="pink" />
                    <Button label="Disabled" disabled />
                </div>
            </section>

            {/* Spacing + Grid system example */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Spacing + Grid</h2>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 bg-gray-100 p-4 rounded">col-span-6</div>
                    <div className="col-span-12 md:col-span-6 bg-gray-200 p-4 rounded">col-span-6</div>
                </div>
            </section>

            {/* Iconography (example using emoji) */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Icons</h2>
                <div className="flex space-x-6 text-3xl">
                    <span>🎯</span>
                    <span>🚀</span>
                    <span>📦</span>
                    <span>🛠️</span>
                    <span>✅</span>
                </div>
            </section>

            {/* Interaction States */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Interaction States</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Hover Me</button>
                    <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed" disabled>Disabled</button>
                    <button className="border border-gray-400 px-4 py-2 rounded focus:ring-2 focus:ring-blue-400">Focus</button>
                </div>
            </section>
        </div>
    );
}
