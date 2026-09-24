import { motion } from 'framer-motion';

export default function PhilippinesICCPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Philippines & the ICC</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>Key Milestones</h2>

            <h3>2011 - Ratification</h3>
            <p>
              The Philippines ratified the Rome Statute, becoming a State Party to the International Criminal Court.
            </p>

            <h3>2018 - Withdrawal Notification</h3>
            <p>
              On March 17, 2018, the Philippines notified the United Nations of its withdrawal from the Rome Statute.
            </p>

            <h3>2019 - Withdrawal Takes Effect</h3>
            <p>
              The withdrawal became effective on March 17, 2019, one year after notification as required by the Rome Statute.
            </p>

            <h3>2021 - Investigation Authorization</h3>
            <p>
              The ICC Pre-Trial Chamber authorized an investigation into alleged crimes against humanity in the Philippines, covering events during the period when the Philippines was a State Party.
            </p>

            <h2>Important Context</h2>
            <p className="bg-muted p-4 rounded-md">
              Under the Rome Statute, the ICC retains jurisdiction over crimes committed while a country was a State Party, even after withdrawal. This means the Court can investigate crimes that occurred before March 17, 2019.
            </p>

            <h2>Note</h2>
            <p className="bg-muted p-4 rounded-md">
              This is a placeholder page. A complete interactive history with sources and detailed context should be added.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
