import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Button } from '../components/ui/button'
import { ArrowLeft, CheckCircle2, Zap, Target, Brain } from 'lucide-react'

interface ScoreCardProps {
  title: string
  score: number
  icon: React.ElementType
  color: string
  delay: number
}

const ScoreCard = ({ title, score, icon: Icon, color, delay }: ScoreCardProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, latest => Math.round(latest * 100) / 100)

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 2,
      delay,
      ease: "easeOut"
    })
    return controls.stop
  }, [score])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", duration: 0.8 }}
      className={`bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden ${color}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-current opacity-5 rounded-full" />
      <Icon className="w-8 h-8 text-current mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <div className="text-4xl font-bold text-current">
        <motion.span>{rounded}</motion.span>
        <span className="text-2xl ml-1">%</span>
      </div>
    </motion.div>
  )
}

export function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scores, reference, summary } = location.state || {}

  useEffect(() => {
    console.log('scores:', scores);    
  }, [])

  if (!scores) {
    navigate('/')
    return null
  }

  const scoreCards = [
    {
      title: 'Consistency',
      score: scores.Consistency,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      delay: 0.2
    },
    {
      title: 'Fluency',
      score: scores.Fluency,
      icon: Zap,
      color: 'text-blue-500',
      delay: 0.4
    },
    {
      title: 'Relevance',
      score: scores.Relevance,
      icon: Target,
      color: 'text-purple-500',
      delay: 0.6
    },
    {
      title: 'Coherence',
      score: scores.Coherence,
      icon: Brain,
      color: 'text-amber-500',
      delay: 0.8
    }
  ]

  const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / 4

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto py-12"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold gradient-text mb-4">Evaluation Results</h2>
        <p className="text-gray-600">
          Overall Score: <span className="font-semibold">{averageScore.toFixed(2)}%</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {scoreCards.map((card) => (
          <ScoreCard key={card.title} {...card} />
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Original reference</h3>
            <p className="text-gray-600 text-sm line-clamp-6">{reference}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Your Summary</h3>
            <p className="text-gray-600 text-sm line-clamp-6">{summary}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Try Another Summary
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}