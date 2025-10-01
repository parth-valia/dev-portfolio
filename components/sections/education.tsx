'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, Trophy, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { StaggerItem } from '@/components/ui/enhanced-animated-section';
import { MatrixHeading, TerminalText } from '@/components/ui/matrix-text-reveal';

const education = [
  {
    degree: 'Bachelor of Computer Applications',
    institution: 'Veer Narmad South Gujarat University (VNSGU)',
    period: 'Aug 2021 - July 2024',
    location: 'Gujarat, India',
    grade: 'First Class with Distinction',
    gpa: '8.5/10',
    description: 'Specialized in Information Technology with focus on software development, mobile applications, and modern web technologies.',
    highlights: [
      'Maintained excellent academic performance with 8.5 CGPA',
      'Strong foundation in programming and software engineering',
      'Coursework in mobile app development and web technologies',
      'Active participation in technical projects and learning'
    ],
    coursework: [
      'Mobile Application Development',
      'Data Structures & Algorithms',
      'Software Engineering',
      'Database Management Systems',
      'Computer Networks',
      'Web Technologies',
      'Object-Oriented Programming',
      'System Design'
    ],
    color: 'from-blue-500 to-purple-500',
  },
  // {
  //   degree: 'Higher Secondary Certificate (HSC)',
  //   institution: 'Science College',
  //   period: '2016 - 2018',
  //   location: 'Mumbai, India',
  //   grade: 'Distinction',
  //   gpa: '82%',
  //   description: 'Science stream with Mathematics, Physics, Chemistry, and Computer Science foundation.',
  //   highlights: [
  //     'Strong foundation in Mathematics and Computer Science',
  //     'Participated in coding competitions and tech events',
  //     'Early exposure to programming languages and software development',
  //     'Developed interest in mobile and web technologies'
  //   ],
  //   coursework: [
  //     'Advanced Mathematics',
  //     'Physics',
  //     'Chemistry',
  //     'Computer Science',
  //     'English'
  //   ],
  //   color: 'from-green-500 to-teal-500',
  // }
];

export function EducationSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <div className="relative z-10">
        {/* Section Header */}
        <StaggerItem className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <GraduationCap className="h-6 w-6 text-matrix-green -mt-2" />
          <TerminalText 
            text="ACADEMIC_RECORDS.EXE" 
            className="text-matrix-green text-sm uppercase tracking-wider"
            delay={0.2}
          />
        </div>
        
        <MatrixHeading 
          level={2}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display"
          delay={0.4}
        >
          Educational <span className="text-cyber-blue font-mono">Foundation</span>
        </MatrixHeading>
        
        <motion.p 
          className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {'>'} Building technical expertise through structured learning and academic excellence
        </motion.p>
      </StaggerItem>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {education.map((edu, index) => (
          <StaggerItem
            key={index}
            delay={index * 0.15}
            className="group"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                filter: 'brightness(1.05)',
                boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
            <TerminalWindow title={`${edu.institution.toLowerCase().replace(/\s+/g, '_')}_${edu.period.split(' - ')[0]}.edu`}>
              <div className="space-y-6">
                {/* Education Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse"></div>
                    <span className="text-matrix-green font-mono text-xs">COMPLETED</span>
                  </div>
                  <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30 font-mono text-xs hover:bg-cyber-blue/30 hover:shadow-lg hover:shadow-cyber-blue/20">
                    {edu.period}
                  </Badge>
                </div>

                {/* Education Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white font-display group-hover:text-matrix-green transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-cyber-blue font-mono text-xs sm:text-sm mt-1">
                      @ {edu.institution} • {edu.location}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0">
                      <span className="text-matrix-green font-mono text-xs sm:text-sm">
                        Grade: {edu.grade}
                      </span>
                      <span className="text-gray-400 font-mono text-xs sm:text-sm">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Highlights */}
                  <div>
                    <h5 className="text-matrix-green font-mono text-sm mb-3 flex items-center">
                      <Trophy className="mr-2 h-4 w-4" />
                      ACHIEVEMENTS:
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {edu.highlights.map((highlight, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-start space-x-2 text-xs"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <Star className="h-3 w-3 text-matrix-green mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Coursework */}
                  <div>
                    <h5 className="text-cyber-blue font-mono text-sm mb-3 flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      KEY_COURSEWORK:
                    </h5>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {edu.coursework.map((course, i) => (
                        <motion.span
                          key={course}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.05 }}
                          className="px-2 py-1 bg-matrix-gray-dark border border-matrix-green-dark text-matrix-green font-mono text-xs rounded hover:border-matrix-green transition-colors"
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terminal Footer */}
                <div className="pt-4 border-t border-matrix-gray-dark text-xs font-mono text-gray-500">
                  <div className="flex justify-between items-center">
                    <span>Status: Academic requirements fulfilled</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-matrix-green"></div>
                      <span>Credentials verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
            </motion.div>
          </StaggerItem>
        ))}
        </div>
      </div>
    </section>
  );
}
