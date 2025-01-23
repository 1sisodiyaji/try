import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Github } from 'lucide-react';
import { events, projects } from '../../data';

const Community = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Our Community</h1>
          <p className="mt-4 text-xl text-gray-600">
            Join our growing community of developers and contributors
          </p>
        </motion.div>

        {/* Contributors Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Top Contributors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1570295999919 + index}-56ceb5ecca61?auto=format&fit=crop&q=80&w=100&h=100`}
                  alt={`Contributor ${index + 1}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Contributor {index + 1}</h3>
                  <p className="text-gray-600">50+ contributions</p>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center mt-2"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    View Profile
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-gray-600">{event.date}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{event.location}</span>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Active Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((_, i) => (
                        <img
                          key={i}
                          src={`https://images.unsplash.com/photo-${1570295999919 + i}-56ceb5ecca61?auto=format&fit=crop&q=80&w=32&h=32`}
                          alt={`Contributor ${i + 1}`}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 inline-flex items-center"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      View Project
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Community;