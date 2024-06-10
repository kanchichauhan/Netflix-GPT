import React from 'react';
import { lang } from '../utils/languageConstant';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang)
  return (
    <div className='seachFormWrapper'>
      <form className='search-form'>
        <input type="text" className='search-input' placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='searchSubmitButton'>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar