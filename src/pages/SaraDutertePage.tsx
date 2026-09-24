import { motion } from 'framer-motion';

export default function SaraDutertePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Sara Duterte</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>Biography</h2>
            <p>
              Sara Zimmerman Duterte-Carpio is a Filipino lawyer and politician who has served as the 15th Vice President of the Philippines since June 30, 2022.
            </p>

            <h2>Public Offices</h2>
            <ul>
              <li>Vice President of the Philippines (2022–present)</li>
              <li>Secretary of Education (2022–2024)</li>
              <li>Mayor of Davao City (2016–2022, 2010–2013)</li>
            </ul>

            <h2>Note</h2>
            <p className="bg-muted p-4 rounded-md">
              This is a placeholder page. Full biographical information, public statements, and relevant timeline should be added with proper sourcing and verification.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
