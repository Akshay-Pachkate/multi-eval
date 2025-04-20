import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'
import { Brain, Loader2 } from 'lucide-react'
import axios from 'axios'

const LoadingAnimation = () => (
  <motion.div
    className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <Brain className="w-16 h-16 text-primary" />
      </motion.div>
      
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-gray-900">Analyzing Summary</h3>
        <div className="flex items-center justify-center gap-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
)

export function Home() {
  const navigate = useNavigate()
  const [reference, setreference] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEvaluate = async () => {
    if (!reference.trim() || !summary.trim()) {
      setError('Please provide both reference and summary')
      return
    }

    if(reference.length <= summary.length){
      setError('Summary should be shorter than the reference')
      return
    }
    
    setLoading(true)
    setError(null)

    const res = await axios.post('https://backend-be-project.akshay-hello-world.workers.dev/evaluate', {summary, reference});

  
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4 gradient-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Multi-Dimensional Summary Evaluation
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enter your reference and its summary below to receive a comprehensive evaluation across multiple dimensions.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              reference
            </label>
            <Textarea
              placeholder="Paste your reference here..."
              value={reference}
              onChange={(e) => setreference(e.target.value)}
              className="w-full h-[400px] border border-gray-200 rounded-lg p-4 text-lg resize-none bg-white/80 hover:bg-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary
            </label>
            <Textarea
              placeholder="Paste your summary here..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full h-[400px] border border-gray-200 rounded-lg p-4 text-lg resize-none bg-white/80 hover:bg-white transition-colors"
            />
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-center mt-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleEvaluate}
            disabled={loading}
            className="bg-primary text-white px-8 py-6 text-lg rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                evaluating...
              </span>
            ) : (
              'Evaluate'
            )}
          </Button>
        </motion.div>

        {error && (
          <motion.div 
            className="mt-6 text-center text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}