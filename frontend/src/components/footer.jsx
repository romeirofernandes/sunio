export default function FooterSection() {
    return (
        <footer className="border-t bg-white py-12 dark:bg-transparent">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-wrap justify-center gap-6">
                    <span
                        className="text-muted-foreground block text-center text-sm">© {new Date().getFullYear()} Sunio. Crafted by Romeiro and Russel</span>
                </div>
            </div>
        </footer>
    );
}
