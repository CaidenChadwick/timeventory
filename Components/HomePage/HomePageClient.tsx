'use client'

import { Container, Row, Col, ListGroup } from "react-bootstrap";
import dynamic from "next/dynamic";
import Suggestions from "./Suggestions";
import Link from "next/link";


interface Item {
    id: string;
    ownerId: string;
    organizationName: string;
    description: string | null;
}

interface HomePageProps {
    loggedIn: boolean,
    userOrganizations: Item[] | null,
    suggestions: Item[] | null
}

export default function HomePageClient({ loggedIn, userOrganizations, suggestions }: HomePageProps) {
    return (
        <Container>
            <Row>
                <Col>
                    {loggedIn && userOrganizations &&
                        <ListGroup>
                            {userOrganizations.map(item => (
                                <ListGroup.Item key={item.organizationName}>
                                    <Link href={`/organization/${item.organizationName}`} className="text-black">
                                        {item.organizationName}
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                </Col>
                <Col>
                    {suggestions &&
                        <ListGroup>
                            {suggestions.map(item => (
                                <ListGroup.Item key={item.organizationName}>
                                    <Link href={`/organization/${item.organizationName}`} className="text-black">
                                        {item.organizationName}
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    )
}