import {useCreateXeroAccountLinkMutation} from "@/generated";

export function useXeroAccountLink()
{
    return useCreateXeroAccountLinkMutation({
        onSuccess: (res) => {
            window.open(res.xeroAccountLink, '_blank')
        }
    })
}