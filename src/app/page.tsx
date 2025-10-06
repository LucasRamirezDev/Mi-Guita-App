
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { MiGuitaLogo } from "@/components/icons";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5
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

export default function Home() {
  return (
    <motion.main 
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-sm space-y-6">
        <motion.div className="text-center" variants={itemVariants}>
          <MiGuitaLogo className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Bienvenido a Mi Guita
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Toma el control de tu dinero. Organiza tus finanzas hoy.
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
            <Card className="w-full">
            <CardContent className="p-6">
                <LoginForm />
            </CardContent>
            </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
                © 2025 Diseñado por{' '}
                <Link
                    href="https://www.lucasramirez.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-primary"
                >
                    Lucas®
                </Link>
            </p>
        </motion.div>
      </div>
    </motion.main>
  );
}

