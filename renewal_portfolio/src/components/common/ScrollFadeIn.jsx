import { motion } from "framer-motion";
const ScrollFadeIn = ({children, delay = 0, duration = 1, y = 30, className}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration, delay }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {children}
        </motion.div>
    )
}
export default ScrollFadeIn;