
export interface MissionStructure {

    flight_number: number;
    mission_name: string;
    launch_year: string;
    details: string;

    rocket: {

        rocket_name: string;
        rocket_type: string;

    };

    links: {
        
        mission_patch_small: string;
        article_link: string;
        wikepedia: string;
        video_link: string;
    };
}