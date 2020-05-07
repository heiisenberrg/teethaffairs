import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Modal
} from 'react-native';
import Icon from '../global/Icon';
import View from '../global/View';
import moment from 'moment';
import styles from './styles/index';
import { getHistory } from '../../state/actions/history';
import { getUsers } from '../../state/actions/user';

function UserHistory(props) {
    const { getHistory, getUsers, userList, userDetails, history } = props;
    const [ list, setlist ] = useState([]);
    const [ isVisible, setVisible ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    const [ user, setUser ] = useState(userDetails && (userDetails.user_type !== 'PRIMARY_PATIENT' || userDetails.user_type !== 'PRIMARY-PATIENT') ?
        {
            id: userDetails.id,
            name: `${userDetails.first_name} ${userDetails.last_name}`,
            avatar: userDetails.profile_pic
        } :
        {
            id: 'all-users',
            name: 'All Users',
            avatar: null
        });

    const getDentalVisitsSuccess = () => {
    };

    useEffect(() => {
        if (userDetails && (userDetails.user_type === 'PRIMARY_PATIENT' || userDetails.user_type === 'PRIMARY-PATIENT')) {
            getUsers();
        }
        const data = {
            user_id: user.id
        };
        getHistory(data, getDentalVisitsSuccess, getDentalVisitsFailure);
    }, [ user ]);

    const getDentalVisitsFailure = () => {
        // alert('Network error');
    };

    useEffect(() => {
        setlist(history);
    }, [ history ]);

    const getLabel = type => {
        switch(type) {
            case 'note':
                return 'Dental Note';
            case 'visit':
                return 'Dental Visit';
            case 'reminder':
                return 'Reminder';
            default:
                return 'Dental Question';
        }
    };

    const getTitle = item => {
        const { type } = item;
        switch(type) {
            case 'note':
                return item.title;
            case 'visit':
                return item.visit_reason;
            case 'reminder':
                return item.reminder_text;
            case 'question':
                return item.title;
        }
    };

    const _renderDentalVisitCards = (item) => (
        <TouchableOpacity
            style={ styles.card }
            activeOpacity={ 0.8 }
        >
            <View style={ styles.categoryCard }>
                <Text style={ styles.cardText }>{getLabel(item.type)}</Text>
            </View>
            <View style={ styles.cardHeader } activeOpacity={ 0.8 }>

                <View style={ styles.circleWrapper }>
                    <Icon type={ 'Ionicons' } name={ 'ios-chatbubbles' } size={ 25 } />
                </View>
                <View style={ styles.content }>
                    <View style={ styles.noteTitle }>
                        <Text style={ styles.title }>{getTitle(item)}</Text>
                    </View>
                    <View style={ styles.avatarContent }>
                        <Image
                            style={ styles.avatar }
                            source={ require('../../assets/profile.png') }
                        />
                        <Text style={ [ styles.normalText, styles.person ] }>
                            {item.patient_name}
                        </Text>
                        <Image
                            style={ styles.time }
                            source={ require('../../assets/time.png') }
                        />
                        <Text style={ styles.normalText }>
                            {moment(item.created_on).format('DD MMM YYYY')}
							{/* {visi.question_asked_on.split('T')[0].split('-')[2]}&nbsp;
							{
								monthNames[
									question.question_asked_on.split('T')[0].split('-')[1] - 1
								]
							}
							&nbsp;
							{question.question_asked_on.split('T')[0].split('-')[0]} */}
                        </Text>
                    </View>
                </View>
            </View>
            {/* <Text>
			{item.visit_description}
			</Text> */}
            {/* <View style={ styles.descriptionWrap }>
				<Text style={ styles.visitText }>hfjkhfjk fhjjhj fkbjkj jfkbj vkjkjfjkjj</Text>

			</View> */}
            {/* <View style={ styles.doctorDetails }>
				<View style={ styles.doctorProfile }>
					<Image
						style={ styles.doctorPic }
						source={ require('../../../assets/profile.png') }
					/>
				</View>
				<View style={ styles.doctorInfo }>
					<Text style={ styles.doctorNameText }>Dr. {question.patient_name}</Text>
					<Text style={ styles.addressText }>
						Dentist , New York, Lic no : 2555-6564-2564-154
					</Text>
					<Text style={ styles.addressText }>Answered 9 hours ago</Text>
				</View>
			</View> */}
        </TouchableOpacity>
    );

    const handleFilters = () => {
        setShowModal(!showModal);
    };

    return (
        <View>
            <View style={ styles.divider } />
            <View center
                style={ styles.filterContainer }>
                <TouchableOpacity
                    onPress={ () => (userList && userList.length > 0 ? setVisible(!isVisible) : null) }
                    style={ styles.filter } activeOpacity={ 0.95 }
                >
                    <View row
                        style={ styles.filterWrapper }>
                        <View jC={ 'flex-start' }>
                            <Image
                                style={ styles.filterImage }
                                source={ user && user.profile_pic ? { uri: user.profile_pic } : require('../../assets/profile.png') }
                            />
                        </View>
                        <View row center jC={ 'space-between' }
                            style={ styles.filterContent }>
                            <Text style={ styles.userText }>{user.name}</Text>
                            <View
                                style={ styles.filterArrow }
                            >
                                <Icon type={ 'Ionicons' }
                                    name={ !isVisible ? 'md-arrow-dropright' : 'md-arrow-dropdown' }
                                    size={ 22 }
                                    color={ 'grey' }
                                />
                            </View>
                        </View>
                    </View>
                    {isVisible && (
                        <View style={ styles.scrollViewContainer }>
                            <ScrollView
                                contentContainerStyle={ styles.scrollView }
                                showsVerticalScrollIndicator={ false }>
                                {userList && userList.map((data, index) =>
                                    <TouchableOpacity
                                        onPress={ () => [ setUser({
                                            ...data,
                                            name: `${data.first_name} ${data.last_name}`,
                                            avatar: data.profile_pic
                                        }), setVisible(!isVisible) ] }
                                        key={ `user${index}` }
                                        style={ styles.userContainer }>
                                        <View row style={ styles.profileWrapper }>
                                            <View jC={ 'flex-start' }>
                                                <Image
                                                    style={ styles.filterImage }
                                                    source={ user && user.profile_pic ? { uri: user.profile_pic } : require('../../assets/profile.png') }
                                                />
                                            </View>
                                            <View
                                                style={ styles.userContent }>
                                                <Text style={ styles.userContentText }>
                                                    {data.first_name} {data.last_name}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={ styles.separator } />
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={ styles.container }>
                {
                    list && list.length !== 0 &&
                    <View style={ styles.searchContainer }>
                        {/* <View style={ styles.searchInput }>
                            <TextInput
                                style={ styles.renderHeader }
                                placeholder="Search"
                                onChangeText={ () => { } }
                                inlineImageLeft='search_icon'
                            />
                        </View> */}
                        <TouchableOpacity
                            style={ styles.filterIcon }
                            onPress={ handleFilters }
                        >
                            <Text style={ styles.filterText }>Filter</Text>
                            <Icon
                                type={ 'FontAwesome' }
                                name={ 'filter' }
                                color="#B8B8B8"
                                size={ 20 }
                            />
                        </TouchableOpacity>
                    </View>
                }
                <SafeAreaView
                    style={ styles.cardContainer }
                >
                    {
                        list && list.length !== 0 ?
                            <FlatList
                                data={ list }
                                renderItem={ ({ item }) => _renderDentalVisitCards(item) }
                                keyExtractor={ item => item.id }
                            />
                            :
                            <View style={ styles.emptyResult }>
                                <Text>No Histories Found</Text>
                            </View>
                    }
                </SafeAreaView>
            </View>
            <Modal transparent={ true } visible={ showModal }>
                <View style={ styles.modalWrap }>
                    <View style={ styles.modalTextWrap }>
                        <TouchableOpacity style={ styles.closeIcon }
                            onPress={ () => setShowModal(!showModal) } >
                            <Icon
                                type={ 'Entypo' }
                                name={ 'cross' }
                                color="#999999"
                                size={ 20 }
                            />
                        </TouchableOpacity>
                        <View style={ styles.filterHeaderContainer }>
                            <Icon
                                type={ 'FontAwesome' }
                                name={ 'filter' }
                                color="#00C57D"
                                size={ 20 }
                            />
                            <Text style={ styles.filterText1 }>Filter</Text>
                        </View>
                        <Text style={ styles.filterHeader1 }
                            onPress={ () => setShowModal(!showModal) } >
                            Recent Events
							</Text>
                        <Text style={ styles.filterHeader }>
                            Notes
							</Text>
                        <Text style={ styles.filterHeader }>
                            Dental Visits
							</Text>
                        <Text style={ styles.filterHeader }>
                            Question and Answers
							</Text>
                        <Text style={ styles.filterHeader2 }>
                            Health History
							</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        history: state.history.histories,
        userList: state.user.users,
        userDetails: state.user.user
    };
};

export default connect(mapStateToProps, {
    getHistory,
    getUsers
})(UserHistory);
