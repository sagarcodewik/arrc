import { Button } from "@/components/ui/Button";
import { authenticateWithBiometric } from "./biometricAuth";

const UseBiometricButton = () => {
  const handleBiometric = async () => {
    const result = await authenticateWithBiometric();

    if (result.success) {
      alert("Access granted");
    } else {
      alert(result.error || "Biometric failed");
    }
  };

  return (
    <Button onClick={handleBiometric}>
      Use Biometric
    </Button>
  );
};

export default UseBiometricButton;
