import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'


export const LoadingAnimation = () => (
    <motion.div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 bg-red-100"
        >
          <Brain className="w-16 h-16 text-primary absolute top-24" />
        </motion.div>
  
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-2xl font-semibold text-gray-900">Analyzing Summary</h3>
          <div className="flex items-center justify-center gap-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
