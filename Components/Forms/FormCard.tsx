interface FormCardProps {
    title: string;
    children: React.ReactNode;
}

export default function FormCard({ title, children }: FormCardProps) {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <p className="h1">{title}</p>
                    <div className="card">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}