import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";
import { useState } from "react";

export function TeamUpdate({ team, refetch }) {
  const [teamName, setTeamName] = useState(team?.teamName || "");
  const [teamDescription, setTeamDescription] = useState(team?.teamDescription || "");
  const axiosCommon = UseAxiosCommon();

  const handleEditTeam = async (e) => {
    e.preventDefault();

    try {
      const updatedTeam = { teamName, teamDescription };
      const res = await axiosCommon.put(`/teams/${team?._id}`, updatedTeam);
      
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Team Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refetch team data to show updated details
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update Team",
        text: error?.response?.data?.message || "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 text-white" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team Details</DialogTitle>
          <DialogDescription>
            Modify the team name and description below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditTeam}>
          <div className="grid gap-4 py-4 text-start justify-start">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="teamName" className="text-start">
                Team Name
              </Label>
              <Input
                id="teamName"
                className="col-span-3"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="teamDescription" className="text-start">
                Team Description
              </Label>
              <Input
                id="teamDescription"
                className="col-span-3"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
