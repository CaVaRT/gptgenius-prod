import ThemeToggle from "./ThemeToggle"
import { SiOpenaigym } from 'react-icons/si';

const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-4 px-4 mb-4 ">
        <SiOpenaigym className="text-primary w-10 h-10"/>
        <h2 className="text-primary font-extrabold text-xl mr-auto">GPTGenius</h2>
        <ThemeToggle/>
    </div>
  )
}
export default SidebarHeader