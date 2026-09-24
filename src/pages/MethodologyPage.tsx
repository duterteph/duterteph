import { motion } from 'framer-motion';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Methodology</h1>

          <div className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2>Source Hierarchy</h2>
              <p>
                We prioritize sources in the following order:
              </p>
              <ol>
                <li><strong>Primary sources:</strong> Official ICC documents, government statements, treaties, court decisions</li>
                <li><strong>Secondary sources:</strong> Reports from international organizations, human rights groups</li>
                <li><strong>News sources:</strong> Verified news reporting from established outlets</li>
              </ol>
              <p>
                Every factual claim includes its source. Where multiple sources exist, we note this.
              </p>
            </section>

            <section>
              <h2>Verification Process</h2>
              <p>
                Before information appears on this site:
              </p>
              <ul>
                <li>Sources are verified for authenticity</li>
                <li>Claims are checked against primary documentation where available</li>
                <li>Dates and attribution are confirmed</li>
                <li>Conflicting accounts are noted</li>
              </ul>
            </section>

            <section>
              <h2>News Updates</h2>
              <p>
                News articles are processed through an automated workflow:
              </p>
              <ol>
                <li>Sources are monitored via RSS feeds and APIs</li>
                <li>Relevant articles are filtered and deduplicated</li>
                <li>AI-assisted summarization provides initial summaries</li>
                <li>Source verification checks are applied</li>
                <li><strong>Human approval is required before publication</strong></li>
                <li>Approved content is added to the public site</li>
              </ol>
              <p className="bg-muted p-4 rounded-md">
                <strong>Important:</strong> No news is published automatically. Every article goes through human review before appearing on this site.
              </p>
            </section>

            <section>
              <h2>Attribution</h2>
              <p>
                All content includes clear attribution:
              </p>
              <ul>
                <li>Source organization</li>
                <li>Publication or statement date</li>
                <li>Link to original source where available</li>
                <li>Type of source (primary, secondary, news)</li>
              </ul>
            </section>

            <section>
              <h2>Handling Uncertainty</h2>
              <p>
                We clearly identify:
              </p>
              <ul>
                <li><strong>Verified:</strong> Confirmed by primary sources</li>
                <li><strong>Official Statement:</strong> From an official source but not independently verified</li>
                <li><strong>Allegation:</strong> Claimed but not proven</li>
                <li><strong>Disputed:</strong> Conflicting accounts exist</li>
                <li><strong>Context Required:</strong> Additional information needed for full understanding</li>
                <li><strong>Not Verified:</strong> Cannot be independently confirmed</li>
              </ul>
            </section>

            <section>
              <h2>Updates and Corrections</h2>
              <p>
                If we identify an error or if new information comes to light:
              </p>
              <ul>
                <li>The content is updated promptly</li>
                <li>The update date is noted</li>
                <li>Significant corrections are clearly marked</li>
              </ul>
            </section>

            <section>
              <h2>Technology</h2>
              <p>
                This site uses:
              </p>
              <ul>
                <li>Static site generation for security and performance</li>
                <li>Client-side search for privacy</li>
                <li>Local storage for bookmarks (no server tracking)</li>
                <li>GitHub Pages for transparent, version-controlled hosting</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
