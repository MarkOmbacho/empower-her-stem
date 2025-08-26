import { useState } from "react";
import { signInWithGoogle, logout, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginModal = ({ open, onClose }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (e) {
      alert("Login failed");
    }
    setLoading(false);
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-6">Please log in with Google to access this content.</p>
        <Button onClick={handleLogin} disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Sign in with Google"}
        </Button>
        <Button variant="outline" onClick={onClose} className="w-full mt-4">Cancel</Button>
      </div>
    </div>
  );
};
export default LoginModal;
