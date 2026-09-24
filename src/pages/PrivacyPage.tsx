import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Privacy</h1>

          <div className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2>Data Collection</h2>
              <p>
                This website is designed to minimize data collection:
              </p>
              <ul>
                <li><strong>No user accounts:</strong> No registration or login required</li>
                <li><strong>No server-side tracking:</strong> We do not track your visits on our servers</li>
                <li><strong>No cookies:</strong> We do not use tracking cookies</li>
                <li><strong>No personal information collected:</strong> We do not collect names, emails, or other personal data</li>
              </ul>
            </section>

            <section>
              <h2>Local Storage</h2>
              <p>
                The following data is stored locally in your browser:
              </p>
              <ul>
                <li><strong>Theme preference:</strong> Light, dark, or system theme choice</li>
                <li><strong>Bookmarks:</strong> Items you choose to save for later</li>
              </ul>
              <p>
                This data never leaves your device. It is stored using browser localStorage and can be cleared at any time by clearing your browser data.
              </p>
            </section>

            <section>
              <h2>External Links</h2>
              <p>
                This site contains links to external sources, including:
              </p>
              <ul>
                <li>International Criminal Court official website</li>
                <li>Government websites</li>
                <li>News organizations</li>
                <li>International organizations</li>
              </ul>
              <p>
                When you click these links, you leave this site and are subject to the privacy policies of those external sites.
              </p>
            </section>

            <section>
              <h2>GitHub Pages Hosting</h2>
              <p>
                This site is hosted on GitHub Pages. GitHub may collect technical information such as:
              </p>
              <ul>
                <li>IP addresses</li>
                <li>Browser types</li>
                <li>Pages visited</li>
              </ul>
              <p>
                This data collection is governed by GitHub's privacy policy, not by this site's operators.
              </p>
            </section>

            <section>
              <h2>No Analytics</h2>
              <p>
                This site does not use Google Analytics, Facebook Pixel, or similar tracking services.
              </p>
            </section>

            <section>
              <h2>Search</h2>
              <p>
                The search feature operates entirely in your browser. Your search queries are not sent to any server.
              </p>
            </section>

            <section>
              <h2>Changes to Privacy Policy</h2>
              <p>
                If we add any tracking or analytics in the future, this page will be updated to reflect those changes.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p className="bg-muted p-4 rounded-md">
                If you have questions about privacy, contact information should be added here.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
