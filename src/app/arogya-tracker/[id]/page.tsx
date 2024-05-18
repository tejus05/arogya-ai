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
import { Table } from "@radix-ui/themes";



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

  const fitnessSessions = await prisma.fitnessSession.findMany({
    where: {
      goalId: id
    }
  })

  if(!goal) return "Could not find the goal :("
  
  return (
    <div className="flex justify-center flex-col gap-5 items-center h-full bg-gray-200 py-20">
      <div className="text-4xl font-semibold py-10">Your running goals</div>
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="flex flex-col xl:pr-20">
          <Card className="flex flex-col text-center px-20 py-16 space-y-10 shadow-lg bg-white w-full rounded-b-none">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white rounded-t-none">
                Add a running session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription className="h-full w-full">
                  <CreateSessionModal goalId={id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full xl:pl-20">
          {fitnessSessions.length > 0 ? (
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row className="">
                  <Table.ColumnHeaderCell className="">
                    Calories Burnt (in kcal)
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="">
                    Duration (in seconds)
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              {fitnessSessions.map((session, i) => (
                <Table.Body key={i}>
                  <Table.Row>
                    <Table.Cell>{session.caloriesBurnt}</Table.Cell>
                    <Table.Cell className="">{session.duration}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table.Root>
          ) : (
            <div className="text-xl font-medium text-black/80">You are yet to start a fitness session. Go ahead!!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionsPage