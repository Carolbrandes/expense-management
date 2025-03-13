import { useUserQuery } from "@/app/hooks/useUserQuery";

export const User = () => {
    const { user } = useUserQuery();
    console.log("🚀 ~ User ~ user:", user)

    return (
        <div>
            Hi, carol
        </div>
    )
}


