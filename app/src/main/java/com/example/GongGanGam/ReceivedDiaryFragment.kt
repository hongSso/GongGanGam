package com.example.GongGanGam

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.GongGanGam.databinding.FragmentReceivedDiaryBinding

class ReceivedDiaryFragment : Fragment() {
   lateinit var binding : FragmentReceivedDiaryBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = FragmentReceivedDiaryBinding.inflate(inflater, container, false)

        initRecyclerView()

        return binding.root
    }

    private fun initRecyclerView() {

    }

}