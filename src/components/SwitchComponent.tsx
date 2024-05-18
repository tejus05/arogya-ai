"use client"; 

import axios from 'axios';
import { Switch } from './ui/switch';
import { useRouter } from 'next/navigation';
const SwitchComponent = ({ isCompleted, id }: { isCompleted: boolean, id: string }) => {
  const router = useRouter();
  return (
    <Switch
      id="toggle-complete"
      checked={isCompleted}
      onClick={async () => {
        await axios.post("/api/goals/toggle", {
          id: id,
          isCompleted: isCompleted,
        });
        router.refresh();
      }}
      className="bg-gray-300"
    />
  );
}

export default SwitchComponent