export default function Footer() {
  return (

     <footer className="bg-white border-t mt-auto px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© 2025 Saylani Welfare. All rights reserved.</p>
          <div className="space-x-4">
            <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
            <a href="/contact" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
   
  );
}