import InterviewClient from "./InterviewClient";

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InterviewPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;

    const mode = (resolvedSearchParams?.mode as string) || "Interview";
    const name = (resolvedSearchParams?.name as string) || "Candidate";

    return <InterviewClient id={id} mode={mode} name={name} />;
}
