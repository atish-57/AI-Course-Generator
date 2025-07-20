"use client";
import { Button } from "@/components/ui/button";
import { adminConfig } from "@/configs/AdminConfig";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminUsers = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAdmin = adminConfig.emails.includes(
    user?.primaryEmailAddress?.emailAddress
  );

  const dateOptions = {
    day: "2-digit",
    month: "long", 
    year: "numeric",
  };

  // Function to fetch users (moved outside useEffect)
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      setUserCount(data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, []);

  // Function to handle promoting a user to admin
  const handleAddAdmin = async (email) => {
    if (adminConfig.emails.includes(email)) {
      toast.error("User is already an admin.");
      return;
    }

    try {
      // Make an API call to update the admin configuration on the backend
      const response = await fetch("/api/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("User promoted to admin!");
        // Re-fetch the users to update the UI
        setLoading(true);
        await fetchUsers();
      } else {
        throw new Error("Failed to promote user");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      toast.error("Failed to promote user.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Redirect non-admin users to the dashboard
  if (!isAdmin) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registered Users</h1>
      <Button className="mb-4" onClick={() => { setLoading(true); fetchUsers(); }} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh"}
      </Button>
      <div className="overflow-auto max-h-[400px]">
      <Table>
        <TableCaption>Total User: {userCount}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Profile Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Last SignIn</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <Image
                  className="rounded-md"
                  src={user?.image_url}
                  width={44}
                  height={44}
                  alt="User profile"
                />
              </TableCell>
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>
                <a href={`mailto:${user.email_addresses[0]?.email_address}`}>
                  {user.email_addresses[0]?.email_address}
                </a>
              </TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString(
                  "en-GB",
                  dateOptions
                )}
              </TableCell>
              <TableCell>
                {new Date(user?.last_sign_in_at).toLocaleDateString(
                  "en-GB",
                  dateOptions
                )}
              </TableCell>
              <TableCell className="text-right">
                {adminConfig.emails.includes(
                  user.email_addresses[0]?.email_address
                ) ? (
                  <Button>Admin</Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleAddAdmin(user.email_addresses[0]?.email_address)
                    }
                  >
                    Promote as Admin
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
