import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FileText, Newspaper, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const [stats, setStats] = useState({
    timeline: 0,
    documents: 0,
    updates: 0,
    sources: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [timeline, documents, news, sources] = await Promise.all([
        fetch('/duterteph/data/timeline.json').then(r => r.json()),
        fetch('/duterteph/data/documents.json').then(r => r.json()),
        fetch('/duterteph/data/news.json').then(r => r.json()),
        fetch('/duterteph/data/sources.json').then(r => r.json()),
      ]);

      setStats({
        timeline: timeline.length,
        documents: documents.length,
        updates: news.length,
        sources: sources.length,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Understanding Sara Duterte & the ICC
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Explore the timeline, documents, public statements, legal context, and sourced developments.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild>
                <Link to="/timeline">
                  Explore Timeline
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/icc-explained">Understand the ICC</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/updates">Latest Updates</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stats.timeline}</div>
                  <div className="text-sm text-muted-foreground">Timeline Events</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <FileText className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stats.documents}</div>
                  <div className="text-sm text-muted-foreground">Documents</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Newspaper className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stats.updates}</div>
                  <div className="text-sm text-muted-foreground">Sourced Updates</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stats.sources}</div>
                  <div className="text-sm text-muted-foreground">Primary Sources</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12"
            >
              Explore the Information
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Calendar className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Timeline</h3>
                    <p className="text-muted-foreground mb-4">
                      Explore documented events with filtering, search, and detailed sources.
                    </p>
                    <Button variant="link" className="p-0" asChild>
                      <Link to="/timeline">
                        View Timeline <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <BookOpen className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">ICC Process</h3>
                    <p className="text-muted-foreground mb-4">
                      Understand how the International Criminal Court works and key legal terms.
                    </p>
                    <Button variant="link" className="p-0" asChild>
                      <Link to="/icc-explained">
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <FileText className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Primary Documents</h3>
                    <p className="text-muted-foreground mb-4">
                      Access official documents, treaties, and statements with full attribution.
                    </p>
                    <Button variant="link" className="p-0" asChild>
                      <Link to="/documents">
                        Browse Documents <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
              Independent & Transparent
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
              This is an independent informational platform. All claims are sourced and attributed.
              We document what is verifiable and clearly identify uncertainty where it exists.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/methodology">Our Methodology</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sources">View Sources</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
