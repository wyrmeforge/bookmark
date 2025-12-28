import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/shared/ui/button";
import { FormInput } from "@/shared/ui/form-input";

interface IPasswordInputProps {
  name: string;
  label: string;
}

const PasswordInput = ({ name, label }: IPasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsPasswordVisible((prev) => !prev);
    },
    []
  );

  const inputType = isPasswordVisible ? "text" : "password";
  const visibilityIcon = isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />;

  return (
    <div className="grid gap-2">
      <FormInput
        endAdornment={
          <Button
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={togglePasswordVisibility}
            size="icon"
            type="button"
            variant="ghost"
          >
            {visibilityIcon}
          </Button>
        }
        label={label}
        name={name}
        placeholder="*******"
        required
        type={inputType}
      />
    </div>
  );
};

export { PasswordInput };
