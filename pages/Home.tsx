import { IconButton, Searchbar, Text, Title, useTheme } from "react-native-paper";
import AvatarUI from "../components/Avatar";
import { useState, useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import peopleData from "../assets/data.json";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RouteStackParamList from "../routes/routePage";

import styles from "../styles";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

interface Student{
    id: number;
    name: string;
    email: string;
    photo_url: string;
}

type HomeProps = NativeStackScreenProps<RouteStackParamList, "home">;

export function Home({navigation}: HomeProps){
    const theme = useTheme(); 
    const [students, setStudents] = useState<Student[]>();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAZ, setIsAZ] = useState(true);
  
    function removeStudentById(id: number){
      setStudents(students?.filter(student => student.id !== id));
    }
  
    function toggleSort(){
      setIsAZ(!isAZ);
    }
  
    // create id for each student
    useEffect(() => {
      setStudents(peopleData.map((student, index) => {
        return {
          ...student,
          id: index
        };
      }))
    }, []);
    
    const avatarList = (students ?? [])
      .filter(students => students.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        // dont sort if not searching
        if(searchQuery === "") return 0;
        if(isAZ) return a.name.localeCompare(b.name);
        else return b.name.localeCompare(a.name);
      })
      .map((people, idx) => (
        <Animated.View 
          entering={SlideInRight.duration(idx * 100)} 
          exiting={SlideOutRight}
          id={`${idx}`}
          key={`animated-${people.id}`}
        >
          
          <AvatarUI {...people} key={`people-${people.id}`}
            onDelete={removeStudentById}
            onPress={() => navigation.navigate("email", {
                email: people.email,
                name: people.name,
                photo_url: people.photo_url,
            })}
          />
        </Animated.View>
      ));
  
  
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 16,
          backgroundColor: theme.colors.background,
        }}
        contentContainerStyle={{
          rowGap:4,
        }}
      >
        <Title style={[styles.title, styles.paddingBig, {
          textAlign: "center",
        }]}>Students</Title>
  
        <Searchbar 
          placeholder='Search Students'
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            marginVertical: 16,
          }}
          right={(props => <IconButton 
              icon={isAZ ? "format-font-size-decrease" : "format-font-size-increase"} 
              size={24}
              onPress={toggleSort}
              {...props}
            />)}
        />
  
        {
          searchQuery !== "" && <Title style={{ textAlign: "center", marginBottom: 8}}>
            {avatarList.length === 0 ? "No Student Found" : `${avatarList?.length} students found`}
          </Title>
        }

        {avatarList}
      </ScrollView>
    );
}

export default Home;