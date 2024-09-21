import { useState } from "react";
import { InputValidation } from "@/types/validationTypes";

export function useInputValidation(initialValue: string): [InputValidation, React.Dispatch<React.SetStateAction<InputValidation>>] {
    const [state, setState] = useState<InputValidation>({ valid: true, errorMsg: "", value: initialValue });
    return [state, setState];
  }