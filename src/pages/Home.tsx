import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import HomeSkeleton from '../components/HomeSkeleton'
import LoadingAnimation from '../components/LoadingAnimation'



export function Home() {
  const navigate = useNavigate()
  const [reference, setReference] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 1000) // Simulate page load
    return () => clearTimeout(timer)
  }, [])

  const handleEvaluate = async () => {
    if (!reference.trim() || !summary.trim()) {
      setError('Please provide both reference and summary')
      return
    }

    if (reference.length <= summary.length) {
      setError('Summary should be shorter than the reference')
      return
    }

    setLoading(true)
    setError(null)

    const res = await axios.post('https://backend-be-project.akshay-hello-world.workers.dev/evaluate', { summary, reference })

    navigate('/results', {
      state: {
        scores: res.data,
        reference,
        summary
      }
    })

    setLoading(false)

    if (res.status !== 200) {
      setError('An error occurred while evaluating the summary')
      setLoading(false)
      return
    }
  }

  return (
    <>
      {loading && <LoadingAnimation />}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {pageLoading ? (
          // Skeleton View
          <HomeSkeleton/>
        ) : (
          // Actual Form
          <>
            <div className="text-center mb-12">
              <motion.h1 className="text-4xl font-bold mb-4 gradient-text" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                Multi-Dimensional Summary Evaluation
              </motion.h1>
              <motion.p className="text-gray-600 max-w-2xl mx-auto" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                Enter your reference and its summary below to receive a comprehensive evaluation across multiple dimensions.
              </motion.p>
            </div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                <Textarea
                  placeholder="Paste your reference here..."
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full h-[400px] border border-gray-200 rounded-lg p-4 text-lg resize-none bg-white/80 hover:bg-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                <Textarea
                  placeholder="Paste your summary here..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full h-[400px] border border-gray-200 rounded-lg p-4 text-lg resize-none bg-white/80 hover:bg-white transition-colors"
                />
              </div>
            </motion.div>

            <motion.div className="flex justify-center mt-12" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button
                onClick={handleEvaluate}
                disabled={loading}
                className="bg-primary text-white px-8 py-6 text-lg rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Evaluating...
                  </span>
                ) : (
                  'Evaluate'
                )}
              </Button>
            </motion.div>

            {error && (
              <motion.div className="mt-6 text-center text-accent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </>
  )
}
