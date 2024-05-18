import SwitchComponent from "@/components/SwitchComponent"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import prisma from "@/db"
import axios from "axios"

interface SessionsPageParams{
  params: {
    id: string
  }
}

const SessionsPage = async ({params:{id}}:SessionsPageParams) => {
  const goal = await prisma.goals.findUnique({
    where: {
      id
    }
  })

  if(!goal) return "Could not find the goal :("
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Card className="flex flex-col text-center px-20 py-16 space-y-10 shadow-lg bg-white w-full max-w-[40%]">
        <span className="text-2xl font-semibold">{goal.goalName}</span>
        <div className="flex flex-col justify-center items-center gap-y-2">
          <SwitchComponent
            id={goal.id}
            isCompleted={goal.isCompleted}
          />
          <Label htmlFor="toggle-complete">Completed</Label>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col mx-10">
            <span className="font-medium">Start Date </span>
            <span>{goal.startDate.toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col mx-10">
            <span className="font-medium">Streaks </span>
            <span>{goal.streaks} </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SessionsPage