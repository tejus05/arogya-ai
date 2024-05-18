import SwitchComponent from "@/components/SwitchComponent"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import prisma from "@/db"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateSessionModal from "@/components/CreateSessionModal"


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
    <div className="flex justify-center flex-col gap-5 items-center h-screen bg-gray-200">
      <Card className="flex flex-col text-center px-20 py-16 space-y-10 shadow-lg bg-white w-full max-w-[40%]">
        <span className="text-2xl font-semibold">{goal.goalName}</span>
        <div className="flex flex-col justify-center items-center gap-y-2">
          <SwitchComponent id={goal.id} isCompleted={goal.isCompleted} />
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
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white">Add a session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription className="h-full w-full">
                <CreateSessionModal/>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}

export default SessionsPage