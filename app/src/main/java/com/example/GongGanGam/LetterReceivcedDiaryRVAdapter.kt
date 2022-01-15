package com.example.GongGanGam

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.GongGanGam.databinding.ItemReceivedLetterBinding

class LetterReceivcedDiaryRVAdapter() :
    RecyclerView.Adapter<LetterReceivcedDiaryRVAdapter.ViewHolder>(){

    private val diaries = ArrayList<Diary>()

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        val binding: ItemReceivedLetterBinding = ItemReceivedLetterBinding.inflate(LayoutInflater.from(viewGroup.context), viewGroup, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: LetterReceivcedDiaryRVAdapter.ViewHolder, position: Int) {
        holder.bind(diaries[position])

    }

    override fun getItemCount(): Int = diaries.size

    inner class ViewHolder(val binding: ItemReceivedLetterBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(diary: Diary) {
            binding.itemReceivedLetterTitle.text = diary.title
            binding.itemReceivedLetterDate.text = diary.date
            binding.itemReceivedLetterContent.text = diary.content
        }
    }
}