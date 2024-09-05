import {motion} from 'framer-motion'

export default function FloatingShapes({color , left, top, size, delay}) {
  return <motion.div 
    className= {`absolute rounded-full ${color} ${size} opacity-20 blur-xl ` }
    animate = {{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0  %"],
        rotate: [0,360],        
    }}
    style={{
        top,
        left
    }}
    
    transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        delay
    }}
  >

  </motion.div>
}
