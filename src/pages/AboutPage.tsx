import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">About This Project</h1>

          <div className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2>Purpose</h2>
              <p>
                This is an independent informational project designed to provide accessible, sourced information about Sara Duterte, the International Criminal Court (ICC), and related developments.
              </p>
              <p>
                The goal is to make complex legal and political information understandable through an interactive, documentary-style interface.
              </p>
            </section>

            <section>
              <h2>What This Is</h2>
              <ul>
                <li>An independent research and information platform</li>
                <li>A collection of sourced, documented facts and events</li>
                <li>An educational resource about ICC procedures and legal terminology</li>
                <li>A chronological record with full attribution</li>
              </ul>
            </section>

            <section>
              <h2>What This Is NOT</h2>
              <ul>
                <li>Not affiliated with Sara Duterte or the Office of the Vice President</li>
                <li>Not affiliated with the International Criminal Court</li>
                <li>Not affiliated with the Philippine government</li>
                <li>Not a political campaign or advocacy platform</li>
                <li>Not making legal determinations or judgments</li>
              </ul>
            </section>

            <section>
              <h2>Editorial Standards</h2>
              <p>
                All factual claims are sourced and attributed. Where information is uncertain or disputed, we clearly identify it as such. We distinguish between:
              </p>
              <ul>
                <li>Verified facts from primary sources</li>
                <li>Official statements from governments and organizations</li>
                <li>Allegations that have not been independently verified</li>
                <li>Claims that require additional context</li>
              </ul>
            </section>

            <section>
              <h2>Neutrality</h2>
              <p>
                This platform aims to present information without political persuasion. We do not endorse candidates, promote political positions, or make recommendations about how visitors should think or vote.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p className="bg-muted p-4 rounded-md">
                Contact information should be added here if this project becomes public.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
