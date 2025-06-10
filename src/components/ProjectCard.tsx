import { Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
}) => {
  return (
    <div className="bg-[#1f2125]/80 border border-gray-700 rounded-xl p-4 md:p-5 shadow-md hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
      <p className="text-sm text-gray-400 mt-1">Tecnologías usadas: {technologies}</p>
      <a
        href={githubUrl}
        className="text-sm text-white mt-3 inline-block hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="w-4 h-4 inline" /> Ver en GitHub
      </a>
    </div>
  );
};

export default ProjectCard;